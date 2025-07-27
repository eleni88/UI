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
                                    <button class="btn btn-secondary" @click="DeleteSimulation()">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- The Results Modal -->
                    <div class="modal" id="ViewResults">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title"> Results </h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <!-- Modal body -->
                                <div class="modal-body">
                                    <p> Results </p>
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
                                                <th>cloud Provider:</th>
                                                <td> {{ form.simcloud }} </td>
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
                                                        @click="ViewExecClick(form.simid,simexec.execid)">
                                                            View   
                                                    </button>

                                                    <button type="button"
                                                        class="btn btn-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#ViewResults"
                                                        @click="ViewResultsClick(form.simid,simexec.execid)">
                                                            Results   
                                                    </button>

                                                    <button type="button" 
                                                        class="btn btn-secondary"
                                                        @click="DeleteSimExec(form.simid,simexec.execid)">
                                                            Delete    
                                                    </button>                                              
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
                                <td> {{ sim.usersCollection.simcloud }} </td>
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
                                    @click="editClick(sim)" v-if="hasLink(sim._links, 'update_sim')">
                                        Edit   
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    @click="DeleteSim(sim)" v-if="hasLink(sim._links, 'delete_sim')">
                                        Delete    
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    @click="RunSimulation(sim)" :disabled="loading" >
                                        Execute    
                                    </button>
                                </td>
                                <td>
                                    <div class="progress" v-if="loading">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" :style="{ width: progress + '%' }">
                                        {{ progress }} %
                                        </div>
                                    </div>
                                    <div v-if="!loading && dataLoaded" class="alert alert-success mt-3">
                                        Completed
                                    </div>
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
                simcloud: 0,
                region:{
                        regionid: 0,
                        regioncode: '',
                        regionname: ''},
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
                regionid: 0   
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
            providers: [],
            fieldErrors: {},
            actionMessage: '',
            loading: false,
            progress: 0,
            dataLoaded: false,
            error: null
        }
    },
    computed: {
            selectedProviderRegions() {
                const selectedProvider = this.providers.find(
                    p => p.cloudid === this.updateform.simcloud
                    );
                return selectedProvider?.regions || [];
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
            frm.simcloud=0;
            if (this.mode == 'view'){
                frm.region.regionid=0;
                frm.region.regioncode='';
                frm.region.regionname='';
            }
            else
            if (this.mode == 'edit')    
            frm.regionid=0;
        },
        fillForm(sim,frm){
            if ((sim) && (sim.usersCollection)){
                frm.simid=sim.usersCollection.simid;
                frm.name=sim.usersCollection.name;
                frm.description=sim.usersCollection.description;
                frm.createdate=sim.usersCollection.createdate;
                frm.updatedate=sim.usersCollection.updatedate;
                frm.simparams=sim.usersCollection.simparams;
                frm.codeurl=sim.usersCollection.codeurl;
                frm.simuser=sim.usersCollection.simuser;
                frm.simcloud=sim.usersCollection.simcloud;
                if (this.mode == 'view'){
                    frm.region.regionid=sim.usersCollection.region.regionid;
                    frm.region.regioncode=sim.usersCollection.region.regioncode;
                    frm.region.regionname=sim.usersCollection.region.regionname;
                }
                else
                if ((this.mode == 'edit') || (this.mode == 'create')){
                    frm.regionid=sim.usersCollection.regionid;    
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
                    console.log("ViewClick");
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
                this.fillForm(dbSimulation,this.form)
                console.log('dbSimulation', dbSimulation);
                console.log('form.region',this.form.region);
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
                console.log("providers", this.providers);
                console.log("provider", this.providers[0]);
                console.log("providerid", this.providers[0].cloudid);
            }
            catch(err){
                this.error = err.message;
                }
            },
            
        DeleteSim(sim){
            console.log('sim:', sim);
            if (sim) {
                this.selectedSim=sim;
                console.log('this.selectedSim:', this.selectedSim);
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
                    if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
                var jsonstring = JSON.stringify(this.fieldErrors);
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
                const simlink = this.selectedSim._links.find(link => link.rel === 'update_sim'); 
                console.log('region:', this.form.regionid);
                console.log('provider:',this.form.simcloud);
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
                    if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
                var jsonstring = JSON.stringify(this.fieldErrors);
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
        async DeleteSimulation(sim){
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
                        await this.DeleteSimulation(sim);
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
                body: bodyStr = JSON.stringify(this.runform),
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
                        await this.RunSimulation(sim);
                    }
                    else{
                        this.$router.push('/login');
                    }
                    return;
                }  
                if ((!response.ok) && (response.status != 401)){
                    if (data && typeof data === 'object' && data.errors) {
                this.fieldErrors = data.errors;
                var jsonstring = JSON.stringify(this.fieldErrors);
              }
                throw new Error(jsonstring || `HTTP error! status: ${response.status}`);
                }

                clearInterval(progress);
                this.progress = 100;
                this.dataLoaded = true;

            }
            catch(err){
                clearInterval(progress);
                this.error = err.message;    
            }
            finally{
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
        async DeleteSimExec(simid,simexecid){
            this.error = null;
            try{
                console.log('simid:', simid);
                console.log('simexecid:', simexecid);
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
                        await this.DeleteSimExec(simid,simexecid);
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

            }
            catch(err){
                this.error = err.message;
            }     
        }
    },
    mounted(){
    this.refresSimulations();
    this.GetProviders();
    }
}