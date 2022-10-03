<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        foreach ($products as $product) {
            $product["image_path"] = "http://10.0.2.2:8000" . Storage::url($product["image_path"]);
        }
        return response()->json($products);
    }

    public function getProductByUser($id)
    {
        $data = DB::table('product_user as PU')
            ->select('P.image_path as uri', 'P.orientation as format')
            ->join('products as P', 'P.id', '=', 'PU.product_id')
            ->where('PU.user_id', $id)
            ->get();
        foreach ($data as $product) {
            $product->uri = "http://10.0.2.2:8000" . Storage::url($product->uri);
        }
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
        $productNameExist = Product::where('title', $request['title'])->first();
        if ($productNameExist) return response()->json([
            "sucess" => false,
            "message" => "Le nom du produit est déjà utilisé."
        ]);
        if ($file = $request->file('file')) {
            $name = $file->getClientOriginalName();
            $path = $file->storePubliclyAs('public/images', $name);
            $productImageExist = Product::where('image_path', $path)->first();
            if ($productImageExist) return response()->json([
                "sucess" => false,
                "message" => "L'image sélectionné est déjà utilisé."
            ]);
            $file->move(public_path('storage/images'), $name);
            //store your file into directory and db
            $save = new Product();
            $save->title = $request['title'];
            $save->image_path = $path;
            $save->price = floatval($request['price']);
            $save->orientation = $request['orientation'];
            $save->save();

            return response()->json([
                "success" => true,
                "message" => "Fichier enregistré avec succès",
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
