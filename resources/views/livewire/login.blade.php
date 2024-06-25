<section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#"
           class="w-full max-w-sm justify-center flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-20 h-20 mr-2" src="{{asset('logo-dark.svg')}}" alt="logo">
            Arena Split
        </a>
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Iniciar Sesion
                </h1>
                <x-input-error for="validacion"/>
                <div class="space-y-4 md:space-y-6">

                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Correo electrónico
                        </label>
                        <x-input type="email" id="email" wire:model="email" placeholder="correo@gmail.com"/>
                        <x-input-error for="email"/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Contraseña
                        </label>
                        <x-input type="password" id="password" wire:model="password" placeholder="••••••••"/>
                        <x-input-error for="password"/>
                    </div>
                    <x-button wire:click="login">Entrar</x-button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        No tienes una cuenta?
                        <a href="{{route('register')}}" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Crea una
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

