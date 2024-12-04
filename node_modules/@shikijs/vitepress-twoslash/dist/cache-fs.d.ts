import { b as TwoslashTypesCache } from './shared/vitepress-twoslash.dfe2cbbb.js';
import '@shikijs/twoslash/core';
import 'twoslash';
import 'twoslash-vue';
import '@shikijs/twoslash';

interface FileSystemTypeResultCacheOptions {
    /**
     * The directory to store the cache files.
     *
     * @default '.vitepress/cache/twoslash'
     */
    dir?: string;
}
declare function createFileSystemTypesCache(options?: FileSystemTypeResultCacheOptions): TwoslashTypesCache;

export { type FileSystemTypeResultCacheOptions, createFileSystemTypesCache };
