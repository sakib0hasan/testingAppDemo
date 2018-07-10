import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class BackendService {

    apiurl = 'http://localhost:5000';

    constructor(private http: HttpClient) {
        if (environment.production) {
            this.apiurl = 'http://76.8.60.109:5000';
        }
    }

    getTestScripts(testSuite) {
        return this.http.get(this.apiurl + '/file-lists?testSuite=' + testSuite, httpOptions);
    }

    createTest(payload) {
        return this.http.post(this.apiurl + '/create-test', payload, httpOptions);
    }

    initiateTest(payload) {
        return this.http.post(this.apiurl + '/initiate-test', payload, httpOptions);
    }

    getTestDetails(id) {
        return this.http.get(this.apiurl + '/get-test/' + id, httpOptions);
    }

    getAllTests() {
        return this.http.get(this.apiurl + '/get-all-test', httpOptions);
    }

    getAllOtherTests(payload) {
        return this.http.get(this.apiurl + '/get-all-other-tests?testId=' + payload['id'], httpOptions);
    }

    getTestLogs(payload) {
        return this.http.get(this.apiurl + '/get-test-logs?testId=' + payload['id'], httpOptions);
    }

    compareTests(payload) {
        return this.http.post(this.apiurl + '/compare-test', payload, httpOptions);
    }

    createPreset(payload) {
        return this.http.post(this.apiurl + '/save-preset', payload, httpOptions);
    }

    getAllPresets() {
        return this.http.get(this.apiurl + '/get-all-preset', httpOptions);
    }

    getPresetDetails(payload) {
        return this.http.get(this.apiurl + '/get-preset?id='+payload['id'], httpOptions);
    }

    runPreset(payload) {
        return this.http.get(this.apiurl + '/run-preset?id=' + payload['id'], httpOptions);
    }

    createSeleniumTest(payload) {
        return this.http.get(this.apiurl + '/create-selenium-test?id=' + payload['id'], httpOptions);
    }

    initiateLoadTest(payload) {
        return this.http.get(this.apiurl + '/create-load-test?id=' + payload['id'], httpOptions);
    }

    createSchedule(payload) {
        return this.http.post(this.apiurl + '/create-schedule', payload, httpOptions);
    }

    getAllSchedules() {
        return this.http.get(this.apiurl + '/get-all-schedule', httpOptions);
    }

    getAllTestLibrary() {
        return this.http.get(this.apiurl + '/get-all-test-library', httpOptions);
    }

    createTestLibrary() {
        let payload = {
            'projectType': 'All',
            'libraryName': 'Readings',
            'scriptName': 'Today\'s Power Consumption',
            'requiredParameters': 'None'
        };
        return this.http.post(this.apiurl + '/create-test-library', payload, httpOptions);
    }
}
