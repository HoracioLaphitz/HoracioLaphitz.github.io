interface ProjectFiltersProps {
    selectedCategory: string;
    categories: string[];
    onCategoryChange: (value: string) => void;
    totalPosts: number;
    filteredCount: number;
}

const ProjectFilters = ({
    selectedCategory,
    categories,
    onCategoryChange,
    totalPosts,
    filteredCount,
}: ProjectFiltersProps) => {
    return (
        <div className="mb-12">
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                    onClick={() => onCategoryChange("all")}
                    className={`px-5 py-2 text-xs font-medium tracking-tight rounded-full transition-all duration-200 ${
                        selectedCategory === "all"
                            ? "bg-brand-primary text-white shadow-xs"
                            : "bg-skin-primary/80 border border-skin-border/60 text-skin-muted hover:text-skin-text hover:border-skin-border-medium"
                    }`}
                >
                    Mostrar todo
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-5 py-2 text-xs font-medium tracking-tight rounded-full transition-all duration-200 ${
                            selectedCategory === cat
                                ? "bg-brand-primary text-white shadow-xs"
                                : "bg-skin-primary/80 border border-skin-border/60 text-skin-muted hover:text-skin-text hover:border-skin-border-medium"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Results Counter */}
            {filteredCount !== totalPosts && (
                <div className="text-center text-sm text-skin-muted">
                    Mostrando {filteredCount} de {totalPosts} proyectos
                </div>
            )}
        </div>
    );
};

export default ProjectFilters;
