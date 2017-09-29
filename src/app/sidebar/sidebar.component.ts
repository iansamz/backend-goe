import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'general', title: 'General Enquiries',  icon:'ti-view-list-alt', class: '' },
    { path: 'accomodation', title: 'Accomodation',  icon:'ti-home', class: '' },
    { path: 'mufasa', title: 'Mufasa',  icon:'ti-map', class: '' },
    { path: 'volunteer', title: 'Volunteer',  icon:'ti-paint-roller', class: '' },
    { path: 'clients', title: 'Clients',  icon:'ti-user', class: '' },
    // { path: 'user', title: 'User Profile',  icon:'ti-user', class: '' },
    // { path: 'enquiry', title: 'Enquiry',  icon:'ti-user', class: '' },
    // { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' }
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
