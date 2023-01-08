﻿namespace InvoicesBackend.Models
{
    public class PageDto<T>
    {
        public List<T>Items { get; set; }
        public int TotalPages { get; set; }
        public int ItemFrom { get; set; }
        public int ItemTo { get; set; }
        public int TotalItemsCount { get; set; }

        public PageDto(List<T> items, int totalItemsCount, int pageSize, int pageNumber)
        {
            Items=items;
            TotalItemsCount=totalItemsCount;           
            ItemFrom= pageSize*(pageNumber-1)+1;
            ItemTo= ItemFrom + pageSize -1;
            TotalPages= (int)Math.Ceiling(totalItemsCount/(double)pageSize);

        }
    }
}
