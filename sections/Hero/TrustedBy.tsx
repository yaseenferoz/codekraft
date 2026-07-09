import { clientProjects } from "@/lib/client-projects";

export function TrustedBy() {
  return (
    <div className="ck-trusted">
      <p>Trusted by teams across industries</p>
      <div className="ck-client-rail" aria-label="CodeKraft clients">
        {clientProjects.map((project) => (
          <span key={project.name}>
            <strong>{project.name}</strong>
            <small>{project.category}</small>
          </span>
        ))}
        {clientProjects.map((project) => (
          <span key={`${project.name}-loop`} aria-hidden="true">
            <strong>{project.name}</strong>
            <small>{project.category}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
