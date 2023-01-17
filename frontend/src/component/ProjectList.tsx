import React from 'react';
import { Project } from '../models/Project';

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
    return (
        <ul className="row">
            {projects.map((project) => (
                <div className="cols-sm">
                    <div className="card">
                        <img src={project.imageUrl} alt={project.name} />
                        <section className="section dark">
                            <h5 className="strong">
                                <strong>project name</strong>
                            </h5>
                            <p>project description</p>
                            <p>Budget : project budget</p>
                        </section>
                    </div>
                </div>
            ))}
        </ul>
    )
}

export default ProjectList;