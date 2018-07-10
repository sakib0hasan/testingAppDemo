export class TestTypeResponseModel {
    SelectedTestSuite: string;
    ShowResultsFor: string[];
    ScriptsSelected: any;
    PIN: PINType;
    TestScenario: string;
    TestDetailsPayload: any;
}

export class PINType {
    constructor(private Type: string, private Value: string) {

    }
}
