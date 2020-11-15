import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class MemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const events = [
      { id: 10, name: 'EventPlan', description: 'This is only valid for GUI Team', subtitle: 'GUI Team only', data: '', configuration: {backgroundColor: ''} },
      { id: 50, name: 'Lockdown 2.0', description: '', data: '', configuration: {backgroundColor: 'orange'} },
      { id: 990, name: 'Happy Independence Day', description: '', data: '', configuration: {backgroundColor: 'green'} },
      { id: 81, name: 'real data', description: '', data: `
      <p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="../../images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /></p>
      <h2 style="text-align: center;">Welcome to the TinyMCE Cloud demo!</h2>
      <h5 style="text-align: center;">Note, this includes some "enterprise/premium" features.<br />Visit the <a href="../../pricing">pricing page</a> to learn more about our premium plugins.</h5>
      <p>Please try out the features provided in this full featured example.</p>
      <h2>Got questions or need help?</h2>
      <ul>
      <li>Our <a class="mceNonEditable" href="../../">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
      <li>Have a specific question? Visit the <a class="mceNonEditable" href="https://community.tiny.cloud/forum/">Community Forum</a>.</li>
      <li>We also offer enterprise grade support as part of <a href="../../pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>
      <h2>A simple table to play with</h2>
      <table style="text-align: center; border-collapse: collapse; width: 100%;">
      <thead>
      <tr>
      <th>Product</th>
      <th>Cost</th>
      <th>Really?</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>TinyMCE Cloud</td>
      <td>Get started for free</td>
      <td>YES!</td>
      </tr>
      <tr>
      <td>Plupload</td>
      <td>Free</td>
      <td>YES!</td>
      </tr>
      </tbody>
      </table>
      <h2>Found a bug?</h2>
      <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>
      <h2>Finally ...</h2>
      <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
      <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br />All the best from the TinyMCE team.</p>`, configuration: {backgroundColor: '#1976d2'} },
      { id: 70, name: 'NewYear 2K20', description: '', data: '', configuration: {backgroundColor: 'violet'} },
      { id: 450, name: 'CricketT20', description: '', data: '', configuration: {backgroundColor: 'gray'} },
      { id: 950, name: 'GUI B\'day', description: '', data: '', configuration: {backgroundColor: ''} },
      { id: 580, name: 'Event 1', description: '', data: '', configuration: {backgroundColor: '#1976d2'} }
    ];
    return {events};
  }

}
