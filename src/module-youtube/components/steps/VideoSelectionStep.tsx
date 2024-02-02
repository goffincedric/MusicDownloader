import VideoSelectionForm from '../forms/VideoSelectionForm';
import { Track } from '../../../shared/models/track';
import { MusicActionType } from '../../../shared/contexts/music/MusicActions';
import { useContext, useMemo, useState } from 'react';
import { MusicContext, MusicDispatchContext } from '../../../shared/contexts/music/MusicContext';
import { StepsDispatchContext } from '../../../shared/contexts/steps/StepsContext';
import { StepActionType } from '../../../shared/contexts/steps/StepActions';

export default function VideoSelectionStep() {
  const { tracks } = useContext(MusicContext);
  const dispatchMusicAction = useContext(MusicDispatchContext);
  const dispatchStepAction = useContext(StepsDispatchContext);
  let [formLoading, setFormLoading] = useState(false);
  const canProgress = useMemo(() => tracks.some((track) => track.selected), [tracks]);

  const handleCardSelected = (track: Track) =>
    dispatchMusicAction({
      type: MusicActionType.SET_TRACK_SELECTION,
      track,
      selected: !track.selected,
    });

  const handleToggleAllSelected = (selected: boolean) =>
    dispatchMusicAction({
      type: MusicActionType.SET_ALL_TRACKS_SELECTED,
      selected,
    });

  const handleBack = () => dispatchStepAction({ type: StepActionType.GO_BACK });
  const handleNext = () => {
    setFormLoading(true);
    dispatchStepAction({ type: StepActionType.PROGRESS });
    setFormLoading(false);
  };

  return (
    <VideoSelectionForm
      tracks={tracks}
      onCardSelected={handleCardSelected}
      onToggleAllSelected={handleToggleAllSelected}
      onNext={handleNext}
      onBack={handleBack}
      canProgress={canProgress}
      loading={formLoading}
    />
  );
}
