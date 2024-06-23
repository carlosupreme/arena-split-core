<?php

namespace App\Livewire;

use App\Models\User;
use Livewire\Component;

class Register extends Component
{
    public string $name;
    public string $email;
    public string $password;

    public function register()
    {
        $user = User::create([
            'name' => $this->name,
            'email' => $this->email,
            'password' => bcrypt($this->password),
        ]);

        dd($user);

    }
    public function render()
    {
        return view('livewire.register');
    }
}
