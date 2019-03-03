(module 
   (type $FUNCSIG$VV (func (param v128) (result v128))) 
   (func $test (type $FUNCSIG$VV) (param $0 v128) (result v128) 
      local.get $0 
      local.get $0 
      i32x4.eq
))
