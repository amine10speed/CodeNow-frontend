import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../services/template.service';
import { GenCodeService } from '../../services/gen-code.service';

@Component({
  selector: 'app-gen-code',
  templateUrl: './gen-code.component.html',
  styleUrls: ['./gen-code.component.css']
})
export class GenCodeComponent implements OnInit {
  projectId: number | null = null;
  projectName: string | null = null;
  files: { id: number; name: string; editing: boolean }[] = [];
  currentFileId: number | null = null;
  language: string | null = null;
  designPattern: string | null = null;
  metadataFields: { key: string; value: string }[] = [];
  templates: any[] = [];
  languages = ['Java', 'Python', 'C++', 'JavaScript', 'C#'];
  generatedCode: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private genCodeService: GenCodeService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectName = this.route.snapshot.paramMap.get('name');
  }

  addNewFile(): void {
    const newId = this.files.length + 1;
    const newFileName = `code${newId}`;
    this.files.push({ id: newId, name: newFileName, editing: true });
    this.currentFileId = newId;
  }

  saveFileName(file: any, event: KeyboardEvent): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      file.editing = false;
    }
  }

  selectFile(fileId: number): void {
    this.currentFileId = fileId;
    this.metadataFields = []; // Reset metadata fields when switching files
  }

  onLanguageSelect(lang: string): void {
    this.language = lang;
    this.fetchDesignPatterns();
  }

  onDesignPatternSelect(pattern: string): void {
    this.designPattern = pattern;
    this.onDesignPatternChange();
  }

  fetchDesignPatterns(): void {
    if (this.language) {
      this.templateService.getTemplatesByLanguage(this.language).subscribe((response) => {
        this.templates = response;
      });
    }
  }

  onDesignPatternChange(): void {
    const selectedTemplate = this.templates.find(
      (template) => template.name === this.designPattern
    );
    if (selectedTemplate && selectedTemplate.metadata) {
      const metadata = JSON.parse(selectedTemplate.metadata);
      this.metadataFields = Object.entries(metadata).map(([key, value]) => ({
        key,
        value: ''
      }));
    } else {
      this.metadataFields = [];
    }
  }

  generateCode(): void {
    if (this.projectId && this.language && this.designPattern) {
      const token = localStorage.getItem('token');
      const templateId = this.templates.find((template) => template.name === this.designPattern)?.id;
  
      if (!templateId || !token) {
        alert('Failed to fetch required data!');
        return;
      }
  
      // Explicitly type the accumulator as an object with string keys and string values
      const fieldValues = this.metadataFields.reduce((acc: { [key: string]: string }, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {});
  
      this.genCodeService.generateCode(templateId, this.projectId, fieldValues, token).subscribe(
        (response) => {
          this.generatedCode = response.generatedCode;
        },
        (error) => {
          console.error('Error generating code:', error);
        }
      );
    }
  }
  
}
