/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelId } from './ChannelId';

export type Author = {
    channelId?: ChannelId;
    readonly channelUrl?: string | null;
    channelTitle?: string | null;
    /**
     * @deprecated
     */
    readonly title?: string | null;
};
