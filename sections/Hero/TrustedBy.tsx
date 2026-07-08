import { clientProjects } from "@/lib/client-projects";

export function TrustedBy() {
  const brands = [...clientProjects, ...clientProjects];

  return (
    <div className="ck-trusted">
      <p>Trusted by teams across industries</p>
      <div className="ck-client-rail" aria-label="CodeKraft clients">
        {brands.map((project, index) => (
          <span key={`${project.name}-${index}`}>
            <strong>{project.name}</strong>
            <small>{project.category}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
