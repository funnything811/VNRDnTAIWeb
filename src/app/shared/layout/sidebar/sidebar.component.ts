import { Component, OnInit } from '@angular/core';
import { IsLoadingService } from '@service-work/is-loading';
import {
  decodeToken,
  getStorageToken,
  verifyLocalStorageToken,
  verifySessionStorageToken,
} from 'src/app/utilities/jwt.util';
import { WrapperService } from 'src/services/wrapper.service';
import * as paths from '../../../common/paths';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  items: any[] = [];
  subItems: any[] = [];
  isShowingSubItems: boolean = false;

  adminSidebarItems: any[] = [
    {
      label: 'Bảng điều khiển',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Quản lý yêu cầu',
      routerLink: '/admin/manage-roms',
    },
    {
      label: 'Quản lý nhân viên',
      routerLink: '/admin/manage-scribes',
    },
    {
      label: 'Quản lý thành viên',
      routerLink: '/admin/manage-users',
    },
  ];

  scribeSidebarItems: any[] = [
    {
      label: 'Yêu cầu của tôi',
      routerLink: '/scribe/my-request',
    },
    // {
    //   label: 'Quản lý luật',
    // },
    {
      label: 'Quản lý biển báo',
      routerLink: '/scribe/manage-signs',
    },
    {
      label: 'Quản lý câu hỏi',
      routerLink: '/scribe/manage-questions',
    },
  ];

  constructor(
    private wrapperService: WrapperService,
    private isLoadingService: IsLoadingService
  ) {}

  ngOnInit(): void {
    if (verifySessionStorageToken()) {
      const token =
        sessionStorage.getItem('token') != ''
          ? sessionStorage.getItem('token')
          : '';

      if (parseInt(decodeToken(token ? token : '').Role) === 0) {
        this.items = this.adminSidebarItems;
      } else if (parseInt(decodeToken(token ? token : '').Role) === 1) {

        this.isLoadingService.add();
        this.wrapperService.get(
          paths.GetScribeAssignColumns +
            '/' +
            decodeToken(token ? token : '').Id,
          getStorageToken(),
          {
            successCallback: (response) => {
              if(response.data.length > 0){
                this.scribeSidebarItems.splice(1, 0, {
                  label: 'Quản lý luật'
                })
                response.data.forEach((c: any) => {
                  this.subItems.push({
                    label: c.column.name,
                    routerLink: '/scribe/manage-laws/',
                    columnId: c.column.id
                  })
                });
              }
              this.isLoadingService.remove();
            },
            errorCallback: (error) => {
              console.log(error);
              this.isLoadingService.remove();
            },
          }
        );

        this.items = this.scribeSidebarItems;
      } else {
        this.items = [];
      }
    } else if (verifyLocalStorageToken()) {
      const token =
        localStorage.getItem('token') != ''
          ? localStorage.getItem('token')
          : '';
      if (parseInt(decodeToken(token ? token : '').Role) === 0) {
        this.items = this.adminSidebarItems;
      } else if (parseInt(decodeToken(token ? token : '').Role) === 1) {

        this.isLoadingService.add();
        this.wrapperService.get(
          paths.GetScribeAssignColumns +
            '/' +
            decodeToken(token ? token : '').Id,
          getStorageToken(),
          {
            successCallback: (response) => {
              if(response.data.length > 0){
                this.scribeSidebarItems.splice(1, 0, {
                  label: 'Quản lý luật'
                })
                response.data.forEach((c: any) => {
                  this.subItems.push({
                    label: c.column.name,
                    routerLink: '/scribe/manage-laws/',
                    columnId: c.column.id
                  })
                });
              }
              this.isLoadingService.remove();
            },
            errorCallback: (error) => {
              console.log(error);
              this.isLoadingService.remove();
            },
          }
        );

        this.items = this.scribeSidebarItems;
      } else {
        this.items = [];
      }
    }
  }

  toggleSubItems(i: number) {
    if(this.subItems.length > 0 && i === 1 && !this.isShowingSubItems){
      this.isShowingSubItems = true;
    } else {
      this.isShowingSubItems = false;
    }
  }
}
