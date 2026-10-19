import { ArrowRight } from 'lucide-react'

type Stage = { name: string; note?: string; emphasis?: boolean }

/**
 * The thesis's query path, simplified from its conceptual framework figure.
 * Only the path a question travels is drawn — ingestion collapses to the
 * caption line and evaluation is left to the result figures — so the router,
 * which the 97.5% figure is about, is the one emphasised node.
 */
const before: Stage[] = [
  { name: 'Query' },
  { name: 'Expansion' },
  { name: 'Query classifier', note: 'Routes each query', emphasis: true },
]

const retrievers = [
  { name: 'Graph', store: 'Neo4j' },
  { name: 'Sparse', store: 'Milvus' },
  { name: 'Dense', store: 'Milvus' },
]

const after: Stage[] = [{ name: 'Document ranker' }, { name: 'LLM response' }]

const step = 'flex w-full flex-col items-center gap-3 xl:w-auto xl:flex-1 xl:flex-row'
const node =
  'w-full max-w-[16rem] rounded-lg border text-center xl:max-w-none xl:flex-1'

/** Points down while the diagram stacks, right once it runs in a row. */
function Arrow() {
  return (
    <ArrowRight
      className="size-5 shrink-0 rotate-90 text-fg xl:rotate-0"
      aria-hidden="true"
    />
  )
}

function StageNode({ stage, first }: { stage: Stage; first: boolean }) {
  return (
    <li className={step}>
      {!first && <Arrow />}
      <div
        className={`${node} px-4 py-3 ${stage.emphasis ? 'border-heading' : 'border-heading/20'}`}
      >
        <p className="text-[15.75px] leading-snug text-heading">{stage.name}</p>
        {stage.note && <p className="mt-1 text-[13.65px]">{stage.note}</p>}
      </div>
    </li>
  )
}

export function PipelineDiagram() {
  return (
    // Captioned by the disclosure that wraps it in Projects, so no figcaption.
    <figure aria-label="Query pipeline" className="flex flex-col gap-6">
      <ol className="flex list-none flex-col items-center gap-3 p-0 xl:flex-row">
        {before.map((stage, index) => (
          <StageNode key={stage.name} stage={stage} first={index === 0} />
        ))}

        <li className={`${step} xl:flex-[1.4]`}>
          <Arrow />
          <div className={`${node} border-dashed border-heading/30 p-2`}>
            <p className="mb-2 text-[13.65px]">Retrievers</p>
            <ul className="flex list-none flex-col gap-1.5 p-0">
              {retrievers.map((retriever) => (
                <li
                  key={retriever.name}
                  className="flex items-baseline justify-between gap-3 rounded-md border border-heading/20 px-3 py-1.5"
                >
                  <span className="text-[15.75px] text-heading">{retriever.name}</span>
                  <span className="font-mono text-[13.65px]">{retriever.store}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>

        {after.map((stage) => (
          <StageNode key={stage.name} stage={stage} first={false} />
        ))}
      </ol>

      <p className="max-w-[86ch] text-[15.75px] leading-relaxed">
        Indexed from 200 SEC filings: text is chunked and embedded into Milvus as
        dense and sparse vectors, and structured financial statements are built
        into a Neo4j knowledge graph.
      </p>
    </figure>
  )
}
