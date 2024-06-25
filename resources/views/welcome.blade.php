<x-layout>
    <h1 class="text-white">
        Hola:pedazo de mierda {{ $user->name }}
    </h1>

    <x-button>
        <a href="{{ route('logout') }}">Cerrar sesión</a>
    </x-button>
</x-layout>
