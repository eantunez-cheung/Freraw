<?php

namespace App\Http\Controllers;

use App\Models\Command_line;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandLineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function getProductByBasket($id){
        $data = DB::table('command_lines as C')
        ->select('C.id as command_line_id', 'P.id as product_id', 'P.title', 'P.price')
        ->join('products as P', 'P.id', '=', 'C.product_id')
        ->where('basket_id', $id)
        ->get();
        return response()->json($data);
    }
    
    /**
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function getNumberCommandLine($id){
        $data = DB::table('command_lines as C')
        ->select('C.id as command_line_id', 'P.id as product_id', 'P.title', 'P.price')
        ->join('products as P', 'P.id', '=', 'C.product_id')
        ->where('basket_id', $id)
        ->get()->count();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $command_line = new Command_line();
        $payload = json_decode($request->getContent(), true);
        if ($command_line->where([['product_id', $payload['productId']], ['basket_id', $payload['basketId']]])->first()) {
            return response()->json('exist');
        }
        $command_line->product_id = $payload['productId'];
        $command_line->basket_id = $payload['basketId'];
        $command_line->save();
        return response()->json('succes');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Command_line  $command_line
     * @return \Illuminate\Http\Response
     */
    public function show(Command_line $command_line)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Command_line  $command_line
     * @return \Illuminate\Http\Response
     */
    public function edit(Command_line $command_line)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Command_line  $command_line
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Command_line $command_line)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Command_line  $command_line
     * @return \Illuminate\Http\Response
     */
    public function destroy(Command_line $command_line)
    {
        $command_line->delete();
        return response()->json("succes");
    }
}
