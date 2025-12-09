const simulations = {
    template: `<div class="container p-5">
                    <h4>Simulations</h4>
                    <!-- Button to Open the Modal -->
                    <button type="button" class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#SimsModal"
                        @click="addClick()">
                        Create new Simulation
                    </button>

                    <!-- Security Questions Modal -->
                    <div class="modal fade" id="SecurityQuestionModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Confirm Action</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <security-questions ref="securityQuestionComponent" />
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary" @click="DeleteSimulation()" v-if="selectedSimExec===null" >Submit</button>
                                    <button class="btn btn-secondary" @click="DeleteSimExec()" v-if="selectedSimExec!=null">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- The Results Modal -->
                    <div class="modal" id="ViewResults">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title">Results — Execution {{ resultsForm.execid }}</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <div v-if="(resultsForm.loading)" class="d-flex align-items-center gap-2">
                                        <div class="spinner-border text-dark" role="status"></div>
                                        <span>Loading results…</span>
                                    </div>
                                    <div v-else-if="resultsForm.error!=null" class="alert alert-danger">
                                        {{ resultsForm.error }}
                                    </div>

                                    <template v-else>
                                        <table class="table table-sm">
                                            <tbody>
                                            <tr>
                                                <th style="width: 260px;">Customers Served</th>
                                                <td>{{ resultsForm.CustomersServed }}</td>
                                            </tr>
                                            <tr>
                                                <th>Avg Waiting Time (sec)</th>
                                                <td>{{ resultsForm.AvgWaitingTime }}</td>
                                            </tr>
                                            <tr v-if="resultsForm.Error!=null">
                                                <th>Error</th>
                                                <td class="text-danger">{{ resultsForm.Error }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </template>
                                </div>

                                <div class="modal-footer">
                                    <button type="button"
                                            class="btn btn-outline-secondary"
                                            @click="exportResultsToPDF()"
                                            :disabled="resultsForm.loading || resultsForm.CustomersServed===null">
                                        Export to PDF
                                    </button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- The SimsModal -->
                    <div class="modal" id="SimsModal">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title"> {{ modalTitle }} </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <div hidden class="input-group mb-3">
                                        <span class="input-group-text">Simid:</span>
                                        <input name="simid" type="number" class="form-control" v-model="updateform.simid">
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Name:</span>
                                        <input name="name" type="text" class="form-control" v-model="updateform.name">
                                        <div style="color: red;" v-if="fieldErrors.Name">
                                            {{ fieldErrors.Name }}
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Description:</span>
                                        <input name="description" type="text" class="form-control" v-model="updateform.description">
                                        <div style="color: red;" v-if="fieldErrors.Description">
                                            {{ fieldErrors.Description }}
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Code URL:</span>
                                        <input name="codeurl" type="text" class="form-control" v-model="updateform.codeurl">
                                        <div style="color: red;" v-if="fieldErrors.Codeurl">
                                            {{ fieldErrors.Codeurl }}
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Simulation Parameters:</span>
                                        <input name="simparams" type="text" class="form-control" v-model="updateform.simparams">
                                        <div style="color: red;" v-if="fieldErrors.Simparams">
                                            {{ fieldErrors.Simparams }}
                                        </div>
                                    </div>

                                    
                                    <div class="input-group mb-3">
                                        <label class="form-label">Cloud Provider</label>
                                        <select class="form-select" v-model="updateform.simcloud">
                                            <option v-for="provider in providers" :key="provider.cloudid" :value="provider.cloudid">
                                            {{ provider.name }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="input-group mb-3">
                                        <label class="form-label">Region</label>
                                        <select class="form-select" v-model="updateform.regionid"> 
                                            <option v-for="region in selectedProviderRegions" :key="region.regionid" :value="region.regionid">
                                            {{ region.regioncode }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="input-group mb-3">
                                        <label class="form-label">Resource</label>
                                        <select class="form-select" v-model="updateform.Resourcerequirement.Instancetype">
                                            <option disabled value="">-- Select Resource --</option>
                                            <option v-for="res in selectProviderInstances" :key="res.instanceid" :value="res.instancetype1">
                                            {{ res.instancetype1 }}
                                            </option>
                                        </select>
                                        <div style="color: red;" v-if="fieldErrors.Resourcerequirement?.Instancetype || fieldErrors.Instancetype">
                                            {{ fieldErrors.Resourcerequirement?.Instancetype || fieldErrors.Instancetype }}
                                        </div>
                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text">MinInstances:</span>
                                        <input name="Resourcerequirement.Mininstances" type="text" class="form-control" v-model="updateform.Resourcerequirement.Mininstances">
                                        <div style="color: red;" v-if="fieldErrors.Resourcerequirement?.Mininstances">
                                            {{ fieldErrors.Resourcerequirement?.Mininstances }}
                                        </div>
                                    </div>

                                    <div class="input-group mb-3">
                                        <span class="input-group-text">MaxInstances:</span>
                                        <input name="Resourcerequirement.Maxinstances" type="text" class="form-control" v-model="updateform.Resourcerequirement.Maxinstances">
                                        <div style="color: red;" v-if="fieldErrors.Resourcerequirement?.Maxinstances">
                                            {{ fieldErrors.Resourcerequirement?.Maxinstances }}
                                        </div>
                                    </div>
                                
                                    <button type="button" @click="CreateSimulation()"
                                        v-if="mode==='create'" class="btn btn-secondary">
                                        Create
                                    </button>
                                    <button type="button" @click="UpdateSimulation()"
                                        v-if="mode==='edit'" class="btn btn-secondary">
                                        Update
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <!-- The View Simulations Executions Modal -->
                    <div class="modal" id="ViewSimExecsModal">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title"> {{ modalTitle }} </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Simulation Execution {{ simexecsform.execid }} info</th>
                                            </tr>   
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <th>State:</th>
                                                <td> {{ simexecsform.State }} </td>
                                            </tr>
                                            <tr>
                                                <th>Cost:</th>
                                                <td> {{ simexecsform.Cost }} </td>
                                            </tr>
                                            <tr>
                                                <th>start date:</th>
                                                <td> {{ simexecsform.Startdate }} </td>
                                            </tr>
                                            <tr>
                                                <th>End date:</th>
                                                <td> {{ simexecsform.Enddate }} </td>
                                            </tr>
                                            <tr>
                                                <th>Duration:</th>
                                                <td> {{ simexecsform.Duration }} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>        

                    <!-- The View Simulations Modal -->
                    <div class="modal" id="ViewSimsModal">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title"> {{ modalTitle }} </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Simulation {{ form.name }} info</th>
                                            </tr>   
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Name:</th>
                                                <td> {{ form.name }} </td>
                                            </tr>
                                            <tr>
                                                <th>Description:</th>
                                                <td> {{ form.description }} </td>
                                            </tr>
                                             <tr>
                                                <th>User:</th>
                                                <td> {{ form.simuser }} </td>
                                            </tr>
                                             <tr>
                                                <th>Cloud Provider:</th>
                                                <td> {{ form.provider.name }} </td>
                                            </tr>
                                            <tr>
                                                <th>Region:</th>
                                                <td> {{ form.region.regioncode }} </td>
                                            </tr>
                                            <tr>
                                                <th>Create date:</th>
                                                <td> {{ form.createdate }} </td>
                                            </tr>
                                            <tr>
                                                <th>Update date:</th>
                                                <td> {{ form.updatedate }} </td>
                                            </tr>
                                            <tr>
                                                <th>Simulation's parameters:</th>
                                                <td> {{ form.simparams }} </td>
                                            </tr>
                                            <tr>
                                                <th>Code URL:</th>
                                                <td> {{ form.codeurl }} </td>
                                            </tr>
                                            <tr>
                                                <th>Resource</th>
                                                <td> {{ form.Resourcerequirement.Instancetype }} </td>
                                            </tr>
                                            <tr>
                                                <th>Mininstances</th>
                                                <td> {{ form.Resourcerequirement.Mininstances }} </td>
                                            </tr>
                                            <tr>
                                                <th>Maxinstances</th>
                                                <td> {{ form.Resourcerequirement.Maxinstances }} </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Simulation Executions</th>
                                            </tr> 
                                            <tr>
                                                <th>State</th>
                                                <th>Cost</th>
                                                <th>start date</th>
                                                <th>End date</th>
                                                <th>Duration</th>
                                            </tr>  
                                        </thead>
                                        <tbody>
                                            <tr v-for="simexec in form.simexecutions" :key="simexec.execid">
                                                <td> {{ simexec.state }} </td>  
                                                <td> {{ simexec.cost }} </td>  
                                                <td> {{ simexec.startdate }} </td> 
                                                <td> {{ simexec.enddate }} </td> 
                                                <td> {{ simexec.duration }} </td>
                                                <td>
                                                    <button type="button"
                                                        class="btn btn-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ViewSimExecsModal"
                                                        @click="ViewExecClick(form.simid,simexec.execid)" :disabled="loading">
                                                            View   
                                                    </button>

                                                    <button type="button"
                                                        class="btn btn-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ViewResults"
                                                        @click="ViewResultsClick(form.simid,simexec.execid)" :disabled="loading">
                                                            Results   
                                                    </button>

                                                    <button type="button" 
                                                        class="btn btn-secondary"
                                                        @click="DeleteSimOrSimexec(form.simid,simexec.execid)" :disabled="loading">
                                                            Delete    
                                                    </button>                                              
                                                </td>
                                                <td>
                                                <div class="progress" v-if="loading && simexec.duration === null">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" :style="{ width: progress + '%' }">
                                                    {{ progress }} %
                                                    </div>
                                                    </div>
                                                    <div v-if="!loading && dataLoaded && simexec.execid===this.newsimexec" class="alert alert-success">
                                                        Completed
                                                    </div>
                                                </td>
                                            </tr>   
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>
                                <div class="d-flex flex-column">
                                    <h6>Filters</h6>

                                    <div class="input-group mb-3 input-group-sm">
                                        <span class="input-group-text">Name:</span>
                                        <input class="form-control form-control-sm" placeholder="Name" v-model="NameFilter" @keyup="FilterFn()">
                                    </div>                              
                                </div>
                                </th>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Create date</th>
                                <th>Update date</th>
                                <th>User</th>
                                <th>Cloud Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sim in simulations" :key="sim.usersCollection.simid">
                                <td> {{ sim.usersCollection.name }} </td>
                                <td> {{ sim.usersCollection.description }} </td>
                                <td> {{ sim.usersCollection.createdate }} </td>
                                <td> {{ sim.usersCollection.updatedate }} </td>
                                <td> {{ sim.usersCollection.simuser }} </td>
                                <td> {{ sim.usersCollection.simcloudNavigation.name }} </td>
                                <td>

                                    <button type="button"
                                    class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ViewSimsModal"
                                    @click="ViewClick(sim)" v-if="hasLink(sim._links, 'self')">
                                        View   
                                    </button>

                                    <button type="button"
                                    class="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#SimsModal"
                                    @click="editClick(sim)" v-if="hasLink(sim._links, 'update_sim')" :disabled="loading">
                                        Edit   
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    @click="DeleteSimOrSimexec(sim)" v-if="hasLink(sim._links, 'delete_sim')" :disabled="loading">
                                        Delete    
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    @click="RunCloudSimulation(sim)">
                                        Execute    
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    @click="RunSimulation(sim)">
                                        Execute on Minikube  
                                    </button>
                                </td>
                            </tr>    
                        </tbody>
                    </table>
    
                    <div v-if="error">
                        <h3>Error: {{ error }}</h3>
                    </div> 
               </div> 
    `,
    data(){
        return{
            simulations:[],
            mode: '',
            selectedSim: null,
            selectedSimExec: null,
            error: null,
            modalTitle: '',
            buttonTitle: '',
            NameFilter: '',
            simsWithoutFilters: [],
            form: {
                simid: 0,
                name: '',
                description: '',
                createdate: '',
                updatedate: '',
                simparams: '',
                codeurl: '',
                simuser: 0,
                provider:{
                    cloudid: 0,
                    name: ''
                },
                region:{
                        regionid: 0,
                        regioncode: '',
                        regionname: ''
                    },
                Resourcerequirement:{
                        Instancetype: '',
                        Mininstances: 0,
                        Maxinstances: 0
                },
                simexecutions: []
            },
            updateform: {
                simid: 0,
                name: '',
                description: '',
                createdate: '',
                updatedate: '',
                simparams: '',
                codeurl: '',
                simuser: 0,
                simcloud: 0, 
                regionid: 0,
                Resourcerequirement:{
                        Instancetype: '',
                        Mininstances: 0,
                        Maxinstances: 0
                },
            }, 
            simexecsform:{
                execid: 0,
                State: '',
                Cost: '',
                Startdate: '',
                Enddate: '',
                Duration: ''
            },
            runform:{
                simid: 0,
                codeurl: '',
                simparams: '',
                name: '',
                description: ''
            }, 
            providerrunform:{
                 simid: 0,
                name: '',
                description: '',
                createdate: '',
                updatedate: '',
                simparams: '',
                codeurl: '',
                simuser: 0,
                provider:{
                    cloudid: 0,
                    name: ''
                },
                region:{
                        regionid: 0,
                        regioncode: '',
                        regionname: ''
                    },
                Resourcerequirement:{
                        Instancetype: '',
                        Mininstances: 0,
                        Maxinstances: 0  
                }      
            },
            resultsForm:{
                simid: 0,
                execid: 0,
                loading: false,
                error: null,
                CustomersServed: null,
                AvgWaitingTime: null,
                Error: null
            },
            providers: [],
            fieldErrors: {},
            actionMessage: '',
            loading: false,
            progress: 0,
            endtime: null,
            dataLoaded: false,
            newsimexec: 0,
            error: null
        }
    },
    computed: {
            selectedProviderRegions() {
                const selectedProvider = this.providers.find(
                    p => p.cloudid === this.updateform.simcloud
                    );
                    console.log('selectedProvider?.regions',selectedProvider?.regions);
                return selectedProvider?.regions || [];
            },
            selectProviderInstances(){
                const selectedProvider = this.providers.find(
                    p => p.cloudid === this.updateform.simcloud
                );
                console.log('selectedProvider?.instancetypes', selectedProvider?.instancetypes);
                console.log('selectedProvider', selectedProvider);
                return selectedProvider?.instancetypes || [];
            }
        },
    methods:{
        async refresSimulations(){
            this.error = null;
            try{
                const response = await fetch(variables.API_URL + "Simulation", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
                });
                let data;
                try{
                    data = await response.json();
                }
                catch{
                    data={};
                } 

                if (response.status === 401){
                    console.log("refresSimulations");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.refresSimulations();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
                this.simulations=data; 
                this.simsWithoutFilters=this.simulations;
            }
            catch(err){
                this.error = err.message;
            }
        },
        clearForm(frm){
            frm.simid=0;
            frm.name='';
            frm.description='';
            frm.createdate='';
            frm.updatedate='';
            frm.simparams='';
            frm.codeurl='';
            frm.simuser=0;          
            if (this.mode == 'view'){
                frm.region.regionid=0;
                frm.region.regioncode='';
                frm.region.regionname='';
                frm.provider.cloudid=0;
                frm.provider.name='';
                frm.Resourcerequirement.Resourceid=0;
                frm.Resourcerequirement.Instancetype='';
                frm.Resourcerequirement.Mininstances=0;
                frm.Resourcerequirement.Maxinstances=0;
            }
            else
            if (this.mode == 'edit')    
            frm.regionid=0;
            frm.simcloud=0;
            frm.instanceid=0;
        },
        fillForm(sim,frm){
            console.log("frm", frm); 
            console.log("sim", sim); 
            if ((sim) && (sim.usersCollection)){
                
                frm.simid=sim.usersCollection.simid;
                frm.name=sim.usersCollection.name;
                frm.description=sim.usersCollection.description;
                frm.createdate=sim.usersCollection.createdate;
                frm.updatedate=sim.usersCollection.updatedate;
                frm.simparams=sim.usersCollection.simparams;
                frm.codeurl=sim.usersCollection.codeurl;
                frm.simuser=sim.usersCollection.simuser;  
                          
                if (this.mode == 'view'){                   
                    frm.region.regionid=sim.usersCollection.region.regionid;
                    frm.region.regioncode=sim.usersCollection.region.regioncode;
                    frm.region.regionname=sim.usersCollection.region.regionname;       
                    frm.provider.cloudid=sim.usersCollection.simcloudNavigation.cloudid;
                    frm.provider.name=sim.usersCollection.simcloudNavigation.name;               
                    
                    frm.Resourcerequirement.Instancetype=sim.usersCollection.resourcerequirement.instancetype;
                    frm.Resourcerequirement.Mininstances=sim.usersCollection.resourcerequirement.mininstances;
                    frm.Resourcerequirement.Maxinstances=sim.usersCollection.resourcerequirement.maxinstances;

                    frm.simexecutions=sim.usersCollection.simexecutions;
                }
                else
                if ((this.mode == 'edit') || (this.mode == 'create')){
                    frm.regionid=sim.usersCollection.regionid;  
                    frm.simcloud=sim.usersCollection.simcloud; 
                    frm.instanceid=sim.usersCollection.instanceid;  
                }
                
            }   
        },
        fillSimExecsFrorm(simexec){
            if (simexec){
                this.simexecsform.execid=simexec.execid;
                this.simexecsform.State=simexec.state;
                this.simexecsform.Cost=simexec.cost;
                this.simexecsform.Startdate=simexec.startdate;
                this.simexecsform.Enddate=simexec.enddate;
                this.simexecsform.Duration=simexec.duration;
            }

        },
        fillRunForm(sim){
            if ((sim) && (sim.usersCollection)){
                this.runform.simid=sim.usersCollection.simid;
                this.runform.codeurl=sim.usersCollection.codeurl;
                this.runform.simparams=sim.usersCollection.simparams;
                this.runform.name=sim.usersCollection.name;
                this.runform.description=sim.usersCollection.description;
            }
        },
        fillProviderRunForm(sim){
             if ((sim) && (sim.usersCollection)){
                this.providerrunform.simid=sim.usersCollection.simid;
                this.providerrunform.codeurl=sim.usersCollection.codeurl;
                this.providerrunform.simparams=sim.usersCollection.simparams;
                this.providerrunform.simcloudname=sim.usersCollection.simcloudnavigation.name;
                this.providerrunform.resourcerequirement.Resourceid=sim.usersCollection.resourcerequirement.resourceid;
                this.providerrunform.simcloud=sim.usersCollection.simcloud;
                this.providerrunform.provider.cloudid=sim.usersCollection.simcloudNavigation.cloudid;
                this.providerrunform.resourcerequirement.instancetype=sim.usersCollection.resourcerequirement.instancetype;
                this.providerrunform.resourcerequirement.mininstances=sim.usersCollection.resourcerequirement.mininstances;
                this.providerrunform.resourcerequirement.maxinstances=sim.usersCollection.resourcerequirement.maxinstances;
                this.providerrunform.region.regionid=sim.usersCollection.region.regionid;
                this.providerrunform.region.regioncode=sim.usersCollection.region.regioncode;
             }
        },
        clearSimExecsForm(){
            this.simexecsform.execid=0;
            this.simexecsform.State='';
            this.simexecsform.Cost='';
            this.simexecsform.Startdate='';
            this.simexecsform.Enddate='';
            this.simexecsform.Duration='';
        },
        hasLink(links, rel) {
          return links.some(link => link.rel === rel);
        },
        FilterFn(){
            const filtername = this.NameFilter.toLowerCase().trim();

            this.simulations = this.simsWithoutFilters.filter(function (el) {
                const fname = el.usersCollection?.name?.toLowerCase() || "";

                return fname.startsWith(filtername)
            });
        },
        async ViewClick(sim){
            this.modalTitle="View Simulation";
            this.mode="view";  
            this.error = null;           
            try{
                const simlink = sim._links.find(link => link.rel === 'self');
                console.log('simlink:', simlink);
                console.log('simlink.href:', simlink.href);
                if (simlink != null){
              const response = await fetch(simlink.href, {
              method: simlink.method,
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
         
            let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                }    
            
                if (response.status === 401){
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.ViewClick(sim);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
            if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            let dbSimulation=data;
            if (dbSimulation){
                console.log("dbSimulation", dbSimulation);
                this.fillForm(dbSimulation,this.form)
            }
            else{
                this.clearForm(this.form);
            }
        }
            }
                catch(err){
                    this.error = err.message;
            }  
        
        },
        addClick(){
            this.modalTitle="Create Simulation";
            this.mode="create";
            this.selectedSim=null;
            this.clearForm(this.updateform);
        },
        editClick(sim){
            this.modalTitle="Edit Simulation";
            this.mode="edit";
            if (sim) {
                this.selectedSim=sim;
                this.fillForm(sim,this.updateform);
            }
            else
                this.clearForm(this.updateform);
        },
        async GetProviders() {
                try {
                const response = await fetch(variables.API_URL + "Provider", {
                    method: "GET",
                    headers: {
                    'Content-Type': 'application/json'
                },
                    credentials: "include"
                });
                let data;
                try{
                    data = await response.json();
                }
                catch{
                    data={};
                } 

                if (response.status === 401){
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.GetProviders();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }
                if ((!response.ok) && (response.status != 401)){
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                }   
                this.providers = data;  
            }
            catch(err){
                this.error = err.message;
                }
            },
            
        DeleteSimOrSimexec(sim,simexec){
            console.log('sim:', sim);
            console.log('simexec:', simexec);
            if (sim) {
                this.selectedSim=sim;
                console.log('this.selectedSim:', this.selectedSim);
                if (simexec) {
                    this.selectedSimExec=simexec
                    console.log('this.selectedSimExec:', this.selectedSimExec);
                } 
                new bootstrap.Modal(document.getElementById("SecurityQuestionModal")).show();      
            }
        },
        async CreateSimulation(){
            this.error = null;
            this.fieldErrors = {};

            try{
                const response = await fetch(variables.API_URL + "Simulation/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.updateform),
                credentials: 'include'
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                if (response.status === 401){
                    console.log("CreateSimulation");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.CreateSimulation();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }             
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring = data.message;    
                        }    
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }
              this.actionMessage='Simulation created successfully.'   
              alert(this.actionMessage);
              this.refresSimulations();
                
            }
            catch(err){
                this.error = err.message;
            }
        },
         async UpdateSimulation(){
            this.error = null;
            this.fieldErrors = {};
            try{
                if (!this.selectedSim || !this.selectedSim._links){
                    throw new Error(`Simulation or simulation links not found`);
                }
                console.log('this.updateform',this.updateform);
                const simlink = this.selectedSim._links.find(link => link.rel === 'update_sim'); 
                console.log('simlink',simlink);
                if (simlink != null) {       
                const response = await fetch(simlink.href, {
                method: simlink.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyStr = JSON.stringify(this.updateform),
                credentials: 'include'
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                if (response.status === 401){
                    console.log("UpdateSimulation");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.UpdateSimulation();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring = data.message;    
                        }
                }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
              }
              this.actionMessage='Simulation updated successfully.'   
              alert(this.actionMessage);
              this.refresSimulations();
            }            
            }
            catch(err){
                this.error = err.message;   
            }        
        },
        async DeleteSimulation(){
            try{
                sim = this.selectedSim;
                if (!sim || !sim._links){
                    throw new Error(`Simulation or simulation links not found`);
                }
                const component = this.$refs.securityQuestionComponent;
                await component.submitQuestions( async () => {
                const link = sim._links.find(link => link.rel === 'delete_sim');
                const response = await fetch(link.href, {
                    method: link.method, 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    credentials: 'include'   
                });
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                } 
                if (response.status === 401){
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.DeleteSimulation();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                } 
                if ((!response.ok) && (response.status != 401)){
                    throw new Error(data.message || `HTTP error! status: ${response.status}`);
              }
              this.actionMessage='Simulation deleted successfully.'   
              alert(this.actionMessage);
              this.refresSimulations();
              bootstrap.Modal.getInstance(document.getElementById("SecurityQuestionModal")).hide();
            })
            }
            catch(err){
                this.error = err.message;    
            }
        },
        async RunSimulation(sim){
            this.selectedSim=sim;
            this.loading = true;
            this.progress = 0;
            this.dataLoaded = false;
            this.error = null;

            const progress = setInterval(() => {
              if (this.progress < 90) {
                this.progress += 10;
              }
            }, 200);

            try{
                if (!sim){
                    throw new Error(`Simulation not found`);
                }
                console.log("simid", sim);
                this.fillRunForm(sim);
                console.log("form", this.runform);
                const response = await fetch(variables.API_URL + "SimulationRun/minikube/run", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.runform),
                credentials: 'include'
                });
                let data;
                try{
                    data = await response.json();
                }
                catch{
                    data={};
                    console.log('data0', data);  
                }   
                console.log('data!!!!!', data);  
                
                console.log('response.ok', response.ok);  
                console.log('response.status', response.status);  
                if (response.status === 401){
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.RunSimulation(sim);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }  
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring = data.message;
                        }
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }

                clearInterval(progress);
                this.progress = 100;
                this.dataLoaded = true;
                this.newsimexec = data;
                
            }
            catch(err){
                clearInterval(progress);
                this.error = err.message;    
                console.log('this.error', this.error);
            }
            finally{
                this.endtime = Date.now();
                setTimeout(() => {
                this.loading = false;
              }, 500);
            }
            
        },
        async RunCloudSimulation(sim){
            this.loading = true;
            this.progress = 0;
            this.dataLoaded = false;
            this.error = null;

            const progress = setInterval(() => {
              if (this.progress < 90) {
                this.progress += 10;
              }
            }, 200);

            try{
                if (!sim){
                    throw new Error(`Simulation not found`);
                }
                console.log("simid", sim);
                this.fillProviderRunForm(sim);
                console.log("form", this.runform);
                const response = await fetch(variables.API_URL + "SimulationRun/run", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyStr = JSON.stringify(this.providerrunform),
                credentials: 'include'
                });
                let data;
                try{
                    data = await response.json();
                }
                catch{
                    data={};
                }     
                if (response.status === 401){
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.RunCloudSimulation(sim);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }  
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object') {
                        if (data.errors){
                            this.fieldErrors = data.errors;
                            var jsonstring = JSON.stringify(this.fieldErrors);
                        }
                        else
                        if (data.message){
                            var jsonstring = data.message;
                        }
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }

                clearInterval(progress);
                this.progress = 100;
                this.dataLoaded = true;
                this.newsimexec = data;

            }
            catch(err){
                clearInterval(progress);
                this.error = err.message;    
            }
            finally{
                this.endtime = Date.now();
                setTimeout(() => {
                this.loading = false;
              }, 500);
            }
            
        },
        async ViewExecClick(simid,simexecid){
            this.modalTitle="View Simulation Execution";
            this.mode="view";  
            
            this.error = null;
            try{
                console.log('simid:', simid);
                console.log('simexecid:', simexecid);

              const response = await fetch(variables.API_URL + "Simulation/" + simid + "/simexecutions/" + simexecid, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
         
            let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                }  
                if (response.status === 401){
                    console.log("DeleteSimViewExecClickulation");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.ViewExecClick(simid,simexecid);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }   
            
            if ((!response.ok) && (response.status != 401)){
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
            } 
            let dbSimulation=data;
            if (dbSimulation){
                this.fillSimExecsFrorm(dbSimulation);
            }
            else{
                this.clearSimExecsForm();
            }

            }
            catch(err){
                this.error = err.message;
            }     

        },
        async DeleteSimExec(){
            this.error = null;
            try{
                simid = this.selectedSim;
                simexecid = this.selectedSimExec;
                console.log('simid:', simid);
                console.log('simexecid:', simexecid);
                const component = this.$refs.securityQuestionComponent;
                await component.submitQuestions( async () => {
                if ((simid) && (simexecid))  {
                    const response = await fetch(variables.API_URL + "Simulation/" + simid + "/simexecutions/" + simexecid, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                        });
                    
                let data;
                try{
                data = await response.json();
                }
                catch{
                data={};
                }   
                if (response.status === 401){
                    console.log("DeleteSimExec");
                    const refreshresponse = await window.refreshToken();
                    if (refreshresponse.ok){
                        await this.DeleteSimExec();
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }    
            
                if ((!response.ok) && (response.status != 401)){
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
                this.actionMessage='Simulation execution deleted successfully.'   
                alert(this.actionMessage);
                bootstrap.Modal.getInstance(document.getElementById("SecurityQuestionModal")).hide();
            } 
            })
            
            }
            catch(err){
                this.error = err.message;
            }     
        },
        async ViewResultsClick(simid, simexecid) {
            this.resultsForm.simid = simid;
            this.resultsForm.execid = simexecid;
            this.resultsForm.loading = true;
            this.resultsForm.error = null;
            this.resultsForm.CustomersServed = [];
            this.resultsForm.AvgWaitingTime = [];
            this.resultsForm.Error = [];

            try {
                const response = await fetch(variables.API_URL + "Simulation/" +simid + "/simexecutions/" + simexecid + "/results", {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json' },
                credentials: 'include'
                });

                let data;
                try { 
                    data = await response.json(); 
                } 
                catch { 
                    data = {}; 
                }

                console.log("data", data);

                if (response.status === 401) {
                const refreshresponse = await window.refreshToken();
                if (refreshresponse.ok) return await this.ViewResultsClick(simid, simexecid);
                this.$router.push('/login');
                return;
                }
                if (!response.ok && response.status !== 401) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
                } 
 
                if ((data.length>0)){            
                   for (let i=0; i<data.length; i++){ 
                     this.resultsForm.CustomersServed[i] = data[i].customersServed ?? null;
                     this.resultsForm.AvgWaitingTime[i] = data[i].avgWaitingTime ?? null;
                     this.resultsForm.Error[i] = data[i].error ?? null;
                   }
                } 
                else
               {
                this.resultsForm.CustomersServed = data.CustomersServed ?? null;
                this.resultsForm.AvgWaitingTime = data.AvgWaitingTime ?? null;
                this.resultsForm.Error = data.Error ?? null;
                }                   

            } catch (err) {
                this.resultsForm.error = err.message;
            } finally {
                this.resultsForm.loading = false;
            }
        },
        exportResultsToPDF() {
        if (this.resultsForm.CustomersServed === null) 
            return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });

        const left = 48, top = 56;
        let y = top;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Simulation Results', left, y);
        y += 22;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        [
            `Simulation ID: ${this.resultsForm.simid}`,
            `Execution ID: ${this.resultsForm.execid}`,
            `Generated: ${new Date().toLocaleString()}`
        ].forEach(line => { doc.text(line, left, y); y += 16; });
        y += 8;

        doc.setFont('helvetica', 'bold');
        doc.text('Summary', left, y);
        y += 16;

        doc.setFont('helvetica', 'normal');
        const rows = [
            ['Customers Served', String(this.resultsForm.CustomersServed)],
            ['Avg Waiting Time (sec)', String(this.resultsForm.AvgWaitingTime)],
        ];
        if (this.resultsForm.Error) rows.push(['Error', this.resultsForm.Error]);

        rows.forEach(([k, v]) => {
            doc.text(`${k}: ${v}`, left, y);
            y += 14;
        });

        const filename = `simulation_${this.resultsForm.simid}_exec_${this.resultsForm.execid}.pdf`;
        doc.save(filename);
        }
    },
    mounted(){
    this.refresSimulations();
    this.GetProviders();
    }
}