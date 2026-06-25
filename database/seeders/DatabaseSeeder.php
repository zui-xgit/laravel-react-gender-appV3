<?php

namespace Database\Seeders;

use App\Models\AccusedDetail;
use App\Models\CaseDetail;
use App\Models\IncidentDetail;
use App\Models\InformantDetail;
use App\Models\User;
use App\Models\VictimDetail;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        // roles
        $adminRole = Role::create(['name' => 'admin']);
        $officerRole = Role::create(['name' => 'officer']);

        //permission
        $dealCasePersmission = Permission::create(['name' => 'case-workflow']); 

        // give permissions to roles
        $adminRole->givePermissionTo($dealCasePersmission); 
        $officerRole->givePermissionTo($dealCasePersmission); 

        

        $adminUser = User::factory()->create([
            'username' => 'jacob.athuman',
            'first_name'=> 'Jacob', 
            'last_name'=> 'Athuman'
        ]);
        $adminUser->assignRole($adminRole);

        
        $officerUser = User::factory()->create([
            'username' => 'elias.marc',
            'first_name'=> 'Elias', 
            'last_name'=> 'Marc'
        ]);
        $officerUser->assignRole($officerRole);


        $cases = CaseDetail::factory(5)->create(); 

        $cases->each(function ($case) {
            if($case->is_anonymous){
                InformantDetail::factory()->anonymous()->for($case)->create(); 
            }else{
                InformantDetail::factory()->for($case)->create(); 
            }
            VictimDetail::factory()->for($case)->create(); 
            AccusedDetail::factory()->for($case)->create();
            IncidentDetail::factory()->for($case)->create();

        }); 
    }
}
