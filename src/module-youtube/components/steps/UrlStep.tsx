import UrlForm, { UrlFormValues } from '../forms/UrlForm';
import { useContext, useState } from 'react';
import { MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import { MusicActionType } from '../../../shared/contexts/music/MusicActions';
import { YoutubeUtils } from '../../../shared/utils/youtube.utils';
import { YoutubeUrlType } from '../../../shared/enums/youtubeUrlType';
import { Track } from '../../../shared/models/track';
import { PlaylistService, VideoService } from '../../../shared/services/openapi';
import { StepsDispatchContext } from '../../../shared/contexts/steps/StepsContext';
import { StepActionType } from '../../../shared/contexts/steps/StepActions';
import { YoutubeTrack } from '../../../shared/models/youtubeTrack';
import { useSearchParams } from 'react-router-dom';

/*
Test data:
 https://www.youtube.com/watch?v=Nucv1NrK3V0
 https://youtu.be/Nucv1NrK3V0
 https://youtu.be/Nucv1NrK3V0?t=7
 https://www.youtube.com/watch?v=z4SC2V154qo&list=OLAK5uy_nZhhpV_7Z2GmAE9d5u3vv8jkZJ-dywalI&index=1
 https://www.youtube.com/playlist?list=OLAK5uy_nZhhpV_7Z2GmAE9d5u3vv8jkZJ-dywalI
 https://youtube.com/playlist?list=OLAK5uy_nZhhpV_7Z2GmAE9d5u3vv8jkZJ-dywalI
 */

const resolveYoutubeVideo = async (url: string): Promise<Track> => {
  const videoDetails = await VideoService.getYoutubeVideo(url);
  return new YoutubeTrack(
    videoDetails.id!,
    videoDetails.authorName!,
    videoDetails.title!,
    videoDetails.url!,
    YoutubeUtils.getBestThumbnail(videoDetails.thumbnails!),
  );
};
const resolveYoutubePlaylist = async (url: string): Promise<Track[]> => {
  const playlistDetails = await PlaylistService.getYoutubePlaylist(url);
  return playlistDetails.tracks!.map(
    (playlistVideo) =>
      new YoutubeTrack(
        playlistVideo.id!,
        playlistVideo.authorName!,
        playlistVideo.title!,
        playlistVideo.url!,
        YoutubeUtils.getBestThumbnail(playlistVideo.thumbnails!),
      ),
  );
};

export default function UrlStep() {
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  let [formLoading, setFormLoading] = useState(false);

  let [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('text');

  const resolveUrlToTracks = async (url: string): Promise<Track[]> => {
    // Resolve url to type
    const urlType = YoutubeUtils.resolveUrlType(url);
    switch (urlType) {
      case YoutubeUrlType.PLAYLIST:
        return await resolveYoutubePlaylist(url);
      case YoutubeUrlType.VIDEO:
        return [await resolveYoutubeVideo(url)];
      case YoutubeUrlType.UNKNOWN:
        throw new Error('Unknown url type for url: ' + url);
    }
  };
  const onUrlSubmit = async (requestedAudio: UrlFormValues) => {
    dispatchMusicAction({
      type: MusicActionType.SET_URL,
      url: requestedAudio.url,
      container: requestedAudio.container,
    });
    // Set loading
    setFormLoading(true);

    try {
      // Resolve url
      const tracks = await resolveUrlToTracks(requestedAudio.url);
      // Set tracks and continue to next step
      dispatchMusicAction({ type: MusicActionType.SET_TRACKS, tracks });
      dispatchStepAction({ type: StepActionType.PROGRESS });
    } catch (error) {
      // TODO: Show error in toast?
      console.log('Caught error', error);
    } finally {
      // Disable loading
      setTimeout(() => setFormLoading(false), 5000);
    }
  };

  return <UrlForm initialUrl={initialUrl} onSubmit={onUrlSubmit} loading={formLoading} />;
}
