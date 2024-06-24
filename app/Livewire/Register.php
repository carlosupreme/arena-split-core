<?php

namespace App\Livewire;

use App\Models\User;
use ArenaSplit\User\Domain\Password;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Validate;
use Livewire\Component;
use Illuminate\Support\Facades\Hash;

class Register extends Component
{
    #[Validate('required|string|max:255')]
    public string $name;

    #[Validate('required|email|max:255|unique:users,email')]
    public string $email;

    #[Validate('required|string|min:8|max:255')]
    public string $password;

    public function register(): void
    {
        $this->validate();

        $user = User::create([
            'name' => $this->name,
            'email' => $this->email,
            'password' => Password::fromPlainText($this->password)->getValue()->toString(),
        ]);

        event(new Registered($user));

        Auth::login($user, true);

        $this->redirect(route('home', absolute: false), navigate: true);
    }

    public function render()
    {
        return view('livewire.register');
    }
}
