//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace INF354API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Symptom
    {
        public int ID { get; set; }
        public string Sym_Description { get; set; }
        public string Sym_Content { get; set; }
        public Nullable<System.DateTime> Sym_DateAdded { get; set; }
        public Nullable<int> WHO_added { get; set; }
    
        public virtual User User { get; set; }
    }
}
