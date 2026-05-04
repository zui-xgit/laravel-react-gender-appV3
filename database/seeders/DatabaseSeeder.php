<?php

namespace Database\Seeders;

use App\Models\AccusedDetail;
use App\Models\CaseDetail;
use App\Models\IncidentDetail;
use App\Models\InformantDetail;
use App\Models\User;
use App\Models\VictimDetail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'role' => 'admin', 
            'username' => 'admin.juma',

            'first_name'=> 'Admin', 
            'last_name'=> 'Juma'
        ]);

        
        User::factory()->create([
            'role' => 'officer', 
            'username' => 'officer.juma',

            'first_name'=> 'Officer', 
            'last_name'=> 'Juma'
        ]);

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
