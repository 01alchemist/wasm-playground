(module
   (memory 1)
   (type $FUNCSIG$VV (func (param v128) (result v128))) 
   (func $test (type $FUNCSIG$VV) (param $0 v128) (result v128) 
      v128.const i32 0x00000001 0x00000002 0x00000000 0x00000003
      return
))
