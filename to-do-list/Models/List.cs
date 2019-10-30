using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace to_do_list.Models
{
    [Table("list")]
    public class List
    {
        [Key]
        [Display(Name = "Código")]
        public int Id { get; set; }

        [Display(Name = "Nome")]
        [Required(ErrorMessage = "Campo obrigatório")]
        public string nome { get; set; }

        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "Campo obrigatório")]
        public string descricao { get; set; }

        [Display(Name = "Data")]
        [Required(ErrorMessage = "Campo obrigatório")]
        public DateTime data { get; set; }
    }
}
