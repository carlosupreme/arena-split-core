@props(['checked' => false])

<input type="checkbox" {{ $checked? 'checked' : '' }} {!! $attributes->merge([
    'class' => "w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
]) !!}>
