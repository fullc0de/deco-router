import { MetadataStorage } from './metadata-storage';

let metadataStorage: MetadataStorage | undefined;

export function getStore(): MetadataStorage {
    if (metadataStorage) {
        return metadataStorage;
    }
    metadataStorage = new MetadataStorage();
    return metadataStorage;
}