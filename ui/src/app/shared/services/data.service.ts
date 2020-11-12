import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  getUnassignedClusters() {
    return [{
      name: 'cluster1',
      clusterId: 4545,
      type: 'cluster',
      subtext: 'Unsynched changes',
      stateIcon: 'icon_warning',
      expand: false,
      children: [
        {
          name: 'dasdsadsad',
          type: 'node',
          subtext: 'Unsynched changes',
          stateIcon: 'icon_maintenance',
          expand: false,
          children: [{
            name: 'RG451',
            type: 'rg',
            subtext: 'Unsynched changes',
            stateIcon: 'icon_normal',
            expand: false
          },{
            name: 'RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451',
            type: 'rg',
            subtext: 'RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451RG451 changes',
            stateIcon: 'icon_normal',
            expand: false
          },{
            name: 'RG145',
            type: 'rg',
            subtext: 'Unsynched changes',
            stateIcon: 'icon_warning',
            expand: false
          },{
            name: 'RG5451',
            type: 'rg',
            subtext: 'Unsynched changes',
            stateIcon: 'icon_normal',
            expand: false
          },{
            name: 'RG5694',
            type: 'rg',
            subtext: 'Unsynched changes',
            stateIcon: 'icon_critical',
            expand: false
          },]
        },
        {
          name: 'nodeB',
          type: 'node',
          subtext: 'ERROR',
          stateIcon: 'icon_critical',
          expand: false
        }]
    }];
  }

  getZonedClusters() {
    return [{
      name: 'zone1',
      type: 'zone',
      subtext: 'Unsynched changes',
      stateIcon: 'icon_normal',
      expand: false,
      children: this.getUnassignedClusters()
    }];
  }

}
