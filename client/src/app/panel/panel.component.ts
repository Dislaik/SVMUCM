import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { User } from '../architecture/model/user';
import { Router } from '@angular/router';
import { AuthService } from '../architecture/service/auth.service';
import { UserService } from '../architecture/service/user.service';
import * as echarts from 'echarts'
import { Project } from '../architecture/model/project';
import { ProjectService } from '../architecture/service/project.service';

@Component({
  selector: 'app-panel',
  standalone: false,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit{
  @ViewChild('chartPopularCareerDOM') chartPopularCareerDOM: ElementRef;

  isChartUsersLoaded: boolean = false;
  chartOptionsUsers: EChartsOption;
  isChartProjectsLoaded: boolean = true;
  chartOptionProjects: EChartsOption;
  chartOptionPopularCareer: EChartsOption;
  chartPopularCareer: ECharts;

  users: User[];
  usersByRole: any;

  projects: Project[];
  projectsByStatus: any;

  title: string = "Panel de administración";
  pages: string;

  constructor(
    private router: Router,
    private elementReference: ElementRef,
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngAfterViewInit() {
      // Inicializa el gráfico
      this.chartPopularCareer = echarts.init(this.chartPopularCareerDOM.nativeElement);
      //this.chartInstance.setOption(this.chartOptionPopularCarreer); // Configura las opciones iniciales
  }

  createBreadCrumb(): void {
    const arrayPages: { [i: number]: { page: string; url: string } } = {
      1: {page: 'Inicio', url: '/'},
      2: {page: this.title, url: this.router.url},
    };
    this.pages = JSON.stringify(arrayPages);
  }
  
  async ngOnInit(): Promise<void> {
    this.createBreadCrumb();

    this.users = await this.userService.getAll();
    
    if (this.users) {
      this.isChartUsersLoaded = true;
      const countUsers = this.users.length;
      this.usersByRole = this.users.reduce((acc: { [key: string]: number }, user: User) => {
        const asd = <string>user.id_role.name;

        if (acc[asd]) {
          acc[asd]++;
        } else {
          acc[asd] = 1;
        }

        return acc;
      }, {});

      console.log(this.usersByRole)
      
      this.chartOptionsUsers = {
        title: {
          text: 'Usuarios',
          subtext: countUsers + ' Usuarios registrados',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Rol',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.usersByRole['admin'], name: 'Administrador', label: { show: false }, labelLine: { show: false } },
              { value: 0, name: 'Coordinador', label: {show:true} },
              { value: 0, name: 'Vinculador con el medio' },
              { value: 0, name: 'Decano' },
              { value: 0, name: 'Jefe de carrera' },
              { value: 0, name: 'Docente' },
              { value: 0, name: 'Alumno voluntario' },
              { value: this.usersByRole['community'], name: 'Comunidad' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }

    this.projects = await this.projectService.getAll();
    const countProjects = this.projects.length;

    this.projectsByStatus = this.projects.reduce((acc: { [key: string]: number }, project: Project) => {
      const asd = <string>project.id_projectStatus.name;

      if (acc[asd]) {
        acc[asd]++;
      } else {
        acc[asd] = 1;
      }

      return acc;
    }, {});

    console.log(this.projectsByStatus);

    this.chartOptionProjects = {
      title: {
        text: 'Proyectos',
        subtext: countProjects + ' Proyectos registrados',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Estado',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.projectsByStatus['created'], name: 'Creado', itemStyle: { color: 'rgba(115, 192, 222, 1)' } },
            { value: 0, name: 'Aprobado', itemStyle: { color: 'rgba(145, 204, 117, 1)' } },
            { value: 0, name: 'Rechazado', itemStyle: { color: 'rgba(238, 102, 102, 1)' } },
            { value: 0, name: 'En revisión', itemStyle: { color: 'rgba(250, 200, 88, 1)' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    let data: DataItem[] = [];
    let now = new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    this.chartOptionPopularCareer = {
      title: {
        text: 'Dynamic Data & Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          params = params[0];
          var date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data: data
        }
      ]
    };


    function randomData(): DataItem {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      };
    }


    setInterval( () => {
      console.log("asdad")
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }


      this.chartPopularCareer.setOption<echarts.EChartsOption>({
        series: [
          {
            data: data
          }
        ]
      });
    
    }, 1000);
    
  }

  

}

interface DataItem {
  name: string;
  value: [string, number];
}