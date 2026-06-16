<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand as BaseServeCommand;

class ServeCommand extends BaseServeCommand
{
    /**
     * @return array<int, string>
     */
    protected function serverCommand()
    {
        $command = parent::serverCommand();
        $ini = base_path('php.ini');

        if (! is_file($ini)) {
            return $command;
        }

        array_splice($command, 1, 0, ['-c', $ini]);

        return $command;
    }
}
