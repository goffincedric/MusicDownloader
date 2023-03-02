import { Step } from '../models/step';
import VideoSelectionStep from '../../module-youtube/components/steps/VideoSelectionStep';
import UrlStep from '../../module-youtube/components/steps/UrlStep';
import DownloadStep from '../../module-youtube/components/steps/DownloadStep';
import ProcessingStep from '../../module-youtube/components/steps/ProcessingStep';
import { TranslationConstants } from './translation.constants';
import { DownloadStatusEnum } from '../enums/downloadStatusEnum';

export const GlobalConstants = {
  Steps: [
    new Step(TranslationConstants.LABELS.URL_STEP_TITLE, UrlStep),
    new Step(
      TranslationConstants.LABELS.TRACK_CHOICE_STEP_TITLE,
      VideoSelectionStep
    ),
    new Step(TranslationConstants.LABELS.PROCESSING_STEP_TITLE, ProcessingStep),
    new Step(TranslationConstants.LABELS.DOWNLOAD_STEP_TITLE, DownloadStep),
  ],
  Music: {
    MAX_CONCURRENT_DOWNLOADS: 4,
    INTERMEDIATE_STATUSES: [DownloadStatusEnum.PROCESSING, DownloadStatusEnum.DOWNLOADING],
    FINAL_STATUSES: [DownloadStatusEnum.FINISHED, DownloadStatusEnum.FAILED],
  },
};
