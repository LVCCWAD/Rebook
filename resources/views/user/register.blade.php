<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Register</h1>
    <form action="{{ route('user.register') }}" method="POST">
        @csrf
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="password" required>
        @error('password')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        <br>
        <label for="password_confirmation">Confirm Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation" required>
        @error('password_confirmation')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror
        <br>
        <button type="submit">Register</button>
    </form>
    <a href="{{Route('login')}}">Click here if you have an account</a>

    @if (session('success'))
        <p>{{ session('success') }}</p>
    @endif

    @if (session('error'))
        <p>{{ session('error') }}</p>
    @endif
</body>
</html>
