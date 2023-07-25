import { Prisma } from "@prisma/client";

export type QueryFields = "epitopeIds" | "participantIds";
export type QueryCheckbox = { id: string; field: QueryFields };

const EpitopeArgs = Prisma.validator<Prisma.EpitopeArgs>()({
  include: { lowerAnnotation: true, upperAnnotation: true },
});
export type Epitope = Prisma.EpitopeGetPayload<typeof EpitopeArgs>[];

const SequencingArgs = Prisma.validator<Prisma.SequencingArgs>()({
  include: { seqHighlighter: true },
});
export type Sequencing = Prisma.SequencingGetPayload<typeof SequencingArgs>[];
