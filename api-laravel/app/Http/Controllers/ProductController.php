<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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
        foreach($products as $product) {
            $product["image_path"] = Storage::url($product["image_path"]);
        }
        return response()->json($products);
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
        $product = new Product();
        // $payload = json_decode($request->getContent(), true);
        $payload = $request->getContent();
        $file = $request->file('file');
        return response()->json($request);
        return response()->json($request->hasFile('file'));
        
        // $productNameExist = Product::where('title', $payload['productName'])->first();
        // $productImageExist = Product::where('image', $payload['image'])->first();

        // if ($productNameExist != null) {
        //     return response()->json('title exist');
        // }
        // if ($productImageExist != null) {
        //     return response()->json('image exist');
        // }

        // $product->title = $payload['productName'];
        // $product->image = $payload['image'];
        // $product->price = floatval($payload['price']);
        // $product->orientation = $payload['orientation'];
    }

    public function uploadProduct(Request $request)
    {
      if ($file = $request->file('file')) {
          $path = $file->store('public/images');
        //   $name = $file->getClientOriginalName();

          //store your file into directory and db
          $save = new Product();
          $save->title = $request['title'];
          $save->image= $path;
          $save->price= floatval($request['price']);
          $save->orientation= $request['orientation'];
          $save->save();
            
          return response()->json([
              "success" => true,
              "message" => "File successfully uploaded",
              "file" => $file
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
        if (Storage::exists($product['image_path'])) {
            Storage::delete($product['image_path']);
        }
        if ($product->delete()) {
            return response()->json("succes");
        } else {
            return response()->json("fail");
        }
    }
}