import { ImageExternal } from "../dto/external/image-external.dto";
import { Image } from "../types/image.types";
import { Adapter } from "./adapter";

export class ImageAdapter implements Adapter<ImageExternal, Image> {

    public toInternal(external: ImageExternal): Promise<Image> {
        
        return Promise.resolve({
            path: external.path,
            extension: external.extension
        });
    }

}