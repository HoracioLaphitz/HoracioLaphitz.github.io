import { DocumentIcon, DownloadIcon, BookOpenIcon, DatabaseIcon } from "@presentation/components/ui/Icons";

interface Resource {
  name: string;
  path: string;
  description?: string;
}

interface ResourceDownloadProps {
  notebooks?: Resource[];
  pdfs?: Resource[];
  datasets?: Resource[];
}

const getIcon = (type: "notebook" | "pdf" | "dataset") => {
  switch (type) {
    case "notebook":
      return <BookOpenIcon className="w-5 h-5" />;
    case "pdf":
      return <DocumentIcon className="w-5 h-5" />;
    case "dataset":
      return <DatabaseIcon className="w-5 h-5" />;
  }
};

const ResourceItem = ({
  resource,
  type,
}: {
  resource: Resource;
  type: "notebook" | "pdf" | "dataset";
}) => (
  <a
    href={resource.path}
    download
    className="focus-ring group flex min-h-11 items-center gap-3 rounded-xl bg-skin-secondary p-4 transition-colors hover:bg-skin-tertiary"
  >
    <div className="flex-shrink-0 text-skin-accent">{getIcon(type)}</div>
    <div className="flex-1 min-w-0">
      <p className="truncate font-medium text-skin-text transition-colors group-hover:text-skin-accent">
        {resource.name}
      </p>
      {resource.description && (
        <p className="text-sm text-skin-muted mt-1">{resource.description}</p>
      )}
    </div>
    <DownloadIcon className="w-4 h-4 text-skin-muted group-hover:text-skin-accent transition-colors flex-shrink-0" />
  </a>
);

export function ResourceDownload({
  notebooks,
  pdfs,
  datasets,
}: ResourceDownloadProps) {
  const hasResources = notebooks?.length || pdfs?.length || datasets?.length;

  if (!hasResources) return null;

  return (
    <section className="mt-12 rounded-2xl bg-skin-secondary p-5 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold text-skin-text">
        Recursos
      </h2>

      <div className="space-y-6">
        {notebooks && notebooks.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-skin-text">
              <BookOpenIcon className="w-5 h-5 text-skin-accent" />
              Notebooks Jupyter
            </h3>
            <div className="space-y-2">
              {notebooks.map((notebook, idx) => (
                <ResourceItem key={idx} resource={notebook} type="notebook" />
              ))}
            </div>
          </div>
        )}

        {pdfs && pdfs.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-skin-text">
              <DocumentIcon className="w-5 h-5 text-skin-accent" />
              Documentos PDF
            </h3>
            <div className="space-y-2">
              {pdfs.map((pdf, idx) => (
                <ResourceItem key={idx} resource={pdf} type="pdf" />
              ))}
            </div>
          </div>
        )}

        {datasets && datasets.length > 0 && (
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-skin-text">
              <DatabaseIcon className="w-5 h-5 text-skin-accent" />
              Datasets
            </h3>
            <div className="space-y-2">
              {datasets.map((dataset, idx) => (
                <ResourceItem key={idx} resource={dataset} type="dataset" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
