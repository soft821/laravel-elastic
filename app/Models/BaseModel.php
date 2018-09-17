<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class BaseModel extends Model
{
    protected $encrypt = [];

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->encrypt)) {
            $value = encrypt($value);
        }

        return parent::setAttribute($key, $value);
    }

    public function getAttribute($key)
    {
        if (in_array($key, $this->encrypt)) {
            if (isset($this->attributes[$key])) {
                if (!empty($this->attributes[$key])) {
                    $value = $this->attributes[$key];
                    if ("eyJpdiI6" == substr($value, 0, 8)) { //make sure value is encrypted
                        return decrypt($value);
                    }
                }
            }
        }

        return parent::getAttribute($key);
    }


    public function attributesToArray()
    {
        $attributes = parent::attributesToArray();

        foreach ($attributes as $key => $value) {
            if (in_array($key, $this->encrypt)) {
                if (!empty($value)) {
                    $value = trim($value);
                    //$attributes[$key] = Crypt::decrypt($value);
                    if ("eyJpdiI6" == mb_substr($value, 0, 8)) { //make sure value is encrypted
                        try {
                            $attributes[$key] = decrypt($value);
                        } catch (\Exception $e) {
                            $attributes[$key] = $value;
                        }
                    } else {
                        $attributes[$key] = $value;
                    }
                }
            }
        }
        return $attributes;
    }


    public function scopeWithAndWhereHas($query, $relation, $constraint)
    {
        return $query->whereHas($relation, $constraint)
            ->with([$relation => $constraint]);
    }

}
