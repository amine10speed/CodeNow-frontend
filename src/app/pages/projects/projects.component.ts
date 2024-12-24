import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    { title: 'Project 1', description: 'Description of project 1' },
    { title: 'Project 2', description: 'Description of project 2' },
    { title: 'Project 3', description: 'Description of project 3' },
    { title: 'Project 4', description: 'Description of project 4' },
    { title: 'Project 5', description: 'Description of project 5' },
    { title: 'Project 6', description: 'Description of project 6' },
    { title: 'Project 7', description: 'Description of project 7' },
    { title: 'Project 8', description: 'Description of project 8' },
  ];

  pageSize = 4;      // Nombre d'éléments par page
  pageIndex = 0;     // Page actuelle
  searchTerm: string = '';  // Terme de recherche

  // Compter les projets après filtrage
  get filteredProjectsCount() {
    return this.filteredProjects().length;
  }

  // Filtrage des projets en fonction du terme de recherche et gestion de la pagination
  filteredProjects() {
    return this.projects
      .filter(project => project.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);  // Applique la pagination
  }

  // Fonction de gestion du changement de page
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
  }
}
