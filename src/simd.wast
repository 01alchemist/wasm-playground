(module
  (type $ft (func (result i32)))
  (memory $0 1)
  (export "test" (func $fn ))
  (func $fn (type $ft)
    i32.const 1
    i32.const 2
    i32.add
  )
)
