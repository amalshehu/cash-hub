import { join } from 'path';

import { SeedConfig } from './seed.config';
 import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Cash Hub';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      /* Select a pre-built Material theme */
     {src: '@angular/material/core/theming/prebuilt/indigo-pink.css', inject: true}

      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];
    this.addPackageBundles({
      name:'@angular/flex-layout',
      path:'node_modules/@angular/flex-layout/bundles/flex-layout.umd.js',
      packageMeta:{
        main: 'index.js',
        format:'cjs'
      }
    });
    // Add packages (e.g. ng2-translate)
    let additionalPackages: ExtendPackages[] = [{
      name: '@angular/material',
      // Path to the package's bundle
      path: 'node_modules/@angular/material/bundles/material.umd.js'
    },
    {
      name: '@swimlane/ngx-datatable',
      // Path to the package's bundle
      path: 'node_modules/@swimlane/ngx-datatable/release/index.js'
    },
    {
      name: 'md2',
      // Path to the package's bundle
      path: 'node_modules/md2/bundles/md2.umd.js'
    }];

    this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
