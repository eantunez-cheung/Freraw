<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = User::all();
        // return response()->json($users);
    }

    /**
     * This function return true if user exist else return false.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $payload = json_decode($request->getContent(), true);
        $user = User::where([['user_name', $payload['userName']], ['password', md5($payload['password'])]])->first();
        if ($user === null) {
            return response()->json(["userExist" => false]);
        }
        $basket = Basket::where('user_id', $user['id'])->first();
        return response()->json(["userExist" => true, "userId" => $user['id'], "profil" => $user['profil'], "basketId" => $basket['id']]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $payload = json_decode($request->getContent(), true);

        $userEmailExist = User::where('email', $payload['email'])->first();
        $userNameExist = User::where('user_name', $payload['userName'])->first();

        if ($userNameExist != null) {
            return response()->json('user name exist');
        }
        if($userEmailExist != null){
            return response()->json('email exist');
        }

        $user->user_name = $payload['userName'];
        $user->password = md5($payload['password']);
        $user->email = $payload['email'];
        $user->profil = 'CLIENT';
        $user->save();

        $basket = new Basket();
        $basket->user_id = $user->id;
        $basket->save();

        return response()->json("succes");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
