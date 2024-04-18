import { ImageExternal } from "../../dto/external/image-external.dto";
import { ImageAdapter } from "../../adapter/image.adapter";
import { ImageRepository } from "../../repository/image.repository";
import { Image } from "../../types/image.types";

export class ImageService {

    private repository: ImageRepository = new ImageRepository();
    private adapter: ImageAdapter = new ImageAdapter();

    public async save(imageExternal: ImageExternal) {

        const image: Image = await this.convertImage(imageExternal);
        
        return this.repository.create(image);
    }

    private async convertImage(imageExternal: ImageExternal) {

        const image = imageExternal || {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
          };

        return this.adapter.toInternal(image);
    }

}