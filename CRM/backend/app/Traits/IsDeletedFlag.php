<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait IsDeletedFlag
{
    protected static function bootIsDeletedFlag()
    {
        static::addGlobalScope('is_deleted', function (Builder $builder) {
            $builder->where($builder->getModel()->getTable() . '.is_deleted', false);
        });
    }

    public function softDelete()
    {
        $this->is_deleted = true;
        $this->save();
    }
}