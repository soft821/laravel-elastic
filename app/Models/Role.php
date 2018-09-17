<?php
/**
 * Created by PhpStorm.
 * User: anthonylucas
 * Date: 28/08/2017
 * Time: 6:29 PM
 */

namespace App\Models;

use App\Models\Menus;
use Illuminate\Database\Eloquent\Model;

class Role extends BaseModel
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'slug', 'description', 'parent_id'];


    public function menus()
    {
        return $this->belongsToMany(Menus::class, 'menus_role');
    }
}
