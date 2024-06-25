<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Illuminate\Support\Facades\Session;

class Login extends Component
{

    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required')]
    public string $password = '';

    public function login()
    {
        $this->validate();
        if(Auth::attempt(['email' => $this->email, 'password' => $this->password]))
        {
            Session::regenerate();
            $this->redirect(route('home'), true);
            return;
        }
        throw ValidationException::withMessages([
            "validacion"=>"Credenciales incorrectas"
        ]);


    }
    public function render()
    {
        return view('livewire.login');
    }
}
