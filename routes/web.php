<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/pelanggan', function () {
    return Inertia::render('Crud/Pelanggan');
})->middleware(['auth', 'verified'])->name('Pelanggan');

Route::get('/genre', function () {
    return Inertia::render('Crud/Genre');
})->middleware(['auth', 'verified'])->name('Genre');

Route::get('/penerbit', function () {
    return Inertia::render('Crud/Penerbit');
})->middleware(['auth', 'verified'])->name('Penerbit');

Route::get('/penulis', function () {
    return Inertia::render('Crud/Penulis');
})->middleware(['auth', 'verified'])->name('Penulis');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
