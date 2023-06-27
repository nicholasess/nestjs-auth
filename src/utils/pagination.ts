type Props = {
  results?: Record<string, any>[];
  page?: number;
  totalCount?: number;
  limit?: number;
};

export const pagination = ({
  results = [],
  page = 0,
  totalCount = 0,
  limit = 15,
}: Props) => {
  const currentCount = limit * page + limit;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results,
    meta: {
      current_page: page,
      current_count: currentCount,
      total_count: totalCount,
      total_pages: totalPages,
      items_per_page: limit,
    },
  };
};
