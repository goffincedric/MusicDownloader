import UrlForm from '../forms/UrlForm';
import { useContext, useState } from 'react';
import { MusicDispatchContext } from '../../contexts/music/MusicContext';
import { MusicActionType } from '../../contexts/music/MusicActions';
import { YoutubeUtils } from '../../../shared/utils/youtube.utils';
import { YoutubeUrlType } from '../../../shared/enums/youtubeUrlType';
import { Track } from '../../../shared/models/track';
import { PlaylistService, VideoService } from '../../../shared/services/openapi';
import { StepsDispatchContext } from '../../contexts/steps/StepsContext';
import { StepActionType } from '../../contexts/steps/StepActions';
import { YoutubeTrack } from '../../../shared/models/youtubeTrack';

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
  const video = await VideoService.getYoutubeVideo(url);
  return new YoutubeTrack(
    video.author?.title!,
    video.title!,
    video.url!,
    YoutubeUtils.getBestThumbnail(video.thumbnails!)
  );
};
const resolveYoutubePlaylist = async (url: string): Promise<Track[]> => {
  const playlistVideos = await PlaylistService.getYoutubePlaylistVideos(url);
  return playlistVideos.map(
    (playlistVideo) =>
      new YoutubeTrack(
        playlistVideo.author?.title!,
        playlistVideo.title!,
        playlistVideo.url!,
        YoutubeUtils.getBestThumbnail(playlistVideo.thumbnails!)
      )
  );
};

export default function UrlStep() {
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  let [formLoading, setFormLoading] = useState(false);

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
  const onUrlSubmit = async (url: string) => {
    dispatchMusicAction({ type: MusicActionType.SET_URL, url });
    // Set loading
    setFormLoading(true);

    try {
      // Resolve url
      const tracks = await resolveUrlToTracks(url);
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

  return <UrlForm onUrlSubmit={onUrlSubmit} loading={formLoading} />;
}
