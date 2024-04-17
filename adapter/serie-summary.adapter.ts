import { SerieSummaryExternal } from "dto/external/serie-summary-external.dto";
import { SerieSummary } from "types/serie-summary.types";
import { Adapter } from "./adapter";

export class SerieSummaryAdapter implements Adapter<SerieSummaryExternal, SerieSummary> {

  public async toInternal(external: SerieSummaryExternal): Promise<SerieSummary> {

    return {
      _id: null,
      serie: null,
      name: external.name,
    };
  }
}
